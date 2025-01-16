from flask import Flask, request, jsonify
from flask_cors import CORS
from algorithm import Week, Day, Task, Habit, FreeSlot, reschedule_week

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication


@app.route("/reschedule", methods=["POST"])
def reschedule():
    try:
        # Parse input JSON
        data = request.json

        # Build Week object from input
        week_data = data.get("week", {})
        week = Week(week_data["week_id"])

        for day_data in week_data["days"]:
            day = Day(
                name=day_data["name"],
                date=day_data["date"],
                waking_up_hour=day_data.get("waking_up_hour"),
                sleeping_hour=day_data.get("sleeping_hour"),
            )

            # Add fixed activities
            for fixed in day_data.get("fixed_activities", []):
                day.add_fixed_activity(
                    FixedActivity(
                        name_id=fixed["name_id"],
                        start_time=fixed["start_time"],
                        end_time=fixed["end_time"],
                        day=fixed["day"],
                        do_not_disturb=fixed.get("do_not_disturb", False),
                    )
                )

            # Add free slots
            for free in day_data.get("free_slots", []):
                day.add_free_slot(
                    FreeSlot(
                        start_time=free["start_time"],
                        end_time=free["end_time"],
                        day=free["day"],
                        stress_level=free["stress_level"],
                    )
                )

            week.add_day(day)

        # Build activities list
        activities_data = data.get("activities", [])
        activities = []
        for act in activities_data:
            if act["type"] == "task":
                activities.append(
                    Task(
                        name_id=act["name_id"],
                        duration=act["duration"],
                        deadline=act["deadline"],
                        user_priority=act["user_priority"],
                        stress_index=act["stress_index"],
                    )
                )
            elif act["type"] == "habit":
                activities.append(
                    Habit(
                        name_id=act["name_id"],
                        duration=act["duration"],
                        deadline=act["deadline"],
                        user_priority=act["user_priority"],
                        remaining_frequency=act["remaining_frequency"],
                        stress_index=act["stress_index"],
                    )
                )

        # Call the scheduling algorithm
        rescheduled_week = reschedule_week(week, activities)

        # Serialize the output
        result = {
            "week_id": rescheduled_week.week_id,
            "days": [
                {
                    "name": day.name,
                    "date": day.date.strftime("%Y-%m-%d"),
                    "fixed_activities": [
                        {
                            "name_id": fa.name_id,
                            "start_time": fa.start_time.strftime("%H:%M"),
                            "end_time": fa.end_time.strftime("%H:%M"),
                        }
                        for fa in day.fixed_activities
                    ],
                    "scheduled_activities": [
                        {
                            "name_id": sa.activity_name_id,
                            "start_time": sa.start_time.strftime("%H:%M"),
                            "end_time": sa.end_time.strftime("%H:%M"),
                        }
                        for sa in day.free_slots
                        if isinstance(sa, ScheduledActivity)
                    ],
                }
                for day in rescheduled_week.days
            ],
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)

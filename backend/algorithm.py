from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from copy import deepcopy

# this is just a simple example of how to use the project structure to create a simple application that prints hello world
print("Hello World")


def subtract_times(end_time, start_time):
    """
    Calculate the difference between two datetime.time objects in minutes.
    :param end_time: datetime.time object representing the end time.
    :param start_time: datetime.time object representing the start time.
    :return: Difference in minutes.
    """
    # Convert time to minutes since midnight
    start_minutes = start_time.hour * 60 + start_time.minute
    end_minutes = end_time.hour * 60 + end_time.minute

    # Calculate the difference
    return end_minutes - start_minutes


# Abstract Activity class -> those are the activities that I want to schedule in my calendar
# Abstract Activity Class
class Activity(ABC):
    def __init__(self, name_id, duration, deadline, user_priority, stress_index):
        """
        Abstract Activity class, parent of Habit and Task.
        :param name_id: Unique identifier for the activity (string)
        :param duration: Duration in minutes
        :param deadline: Deadline (or None if no deadline)
        :param user_priority: User-defined priority level (1 to 5)
        """
        self.name_id = name_id
        self.duration = duration  # in minutes
        self.deadline = datetime.strptime(deadline, "%Y-%m-%d") if deadline else None
        self.user_priority = user_priority  # User-defined (1 to 5)
        self.priority_index = 0  # Dynamically calculated
        self.stress_index = stress_index  # Stress level based on stress data

    @abstractmethod
    def calculate_priority_index(self, current_day):
        """
        Abstract method to calculate priority index.
        Must be implemented in subclasses.
        :param current_day: Current day being scheduled
        """
        pass


# Now there are 2 different subclasses of Activity: Task (things to do with maybe a deadline) and Habit (things to do regularly)
# Task class
class Task(Activity):
    def __init__(self, name_id, duration, deadline, user_priority, stress_index):
        super().__init__(name_id, duration, deadline, user_priority, stress_index)
        self.scheduled = False  # True if task is already scheduled

    def calculate_priority_index(self, current_day):
        """
        Calculate priority index for tasks.
        Includes user priority and deadline proximity.
        """
        # for now this is a demo version with random weights for calculating the priority index
        if self.scheduled:
            self.priority_index = -1  # Completed tasks have no priority
        else:
            days_until_deadline = (
                (self.deadline.date() - current_day).days
                if self.deadline
                else float("inf")
            )
            print(f"Days until deadline: {days_until_deadline}")
            deadline_weight = (
                15
                if days_until_deadline <= 3
                else 10
                if days_until_deadline <= 7
                else 5
                if days_until_deadline <= 14
                else 1
            )
            self.priority_index = self.user_priority * 2 + deadline_weight
            print(f"Priority Index for {self.name_id}: {self.priority_index}")

    # Low weight for tasks with no deadline

    # also demo for now: the priority index is the sum of the user priority*2  and the deadline weight


# Habit Class
class Habit(Activity):
    def __init__(
        self,
        name_id,
        duration,
        deadline,
        user_priority,
        remaining_frequency,
        stress_index,
    ):
        super().__init__(name_id, duration, deadline, user_priority, stress_index)
        self.remaining_frequency = (
            remaining_frequency  # Remaining occurrences for the week
        )

    def calculate_priority_index(self, current_day):
        """
        Calculate priority index for habits.
        Includes user priority, frequency, and (optionally) deadline proximity.
        """
        if self.remaining_frequency <= 0:
            self.priority_index = -1  # No more occurrences needed
        else:
            days_until_deadline = (
                (self.deadline.date() - current_day).days
                if self.deadline
                else float("inf")
            )
            deadline_weight = (
                15
                if days_until_deadline <= 3
                else 10
                if days_until_deadline <= 7
                else 5
                if days_until_deadline <= 14
                else 1
            )
            # Add weight for frequency
            frequency_weight = self.remaining_frequency * 2
            # with this demo version -> I have to check if it is fair the way in wich I calculate the priority index both in task and habits
            self.priority_index = (
                self.user_priority * 2 + deadline_weight + frequency_weight
            )  # Default weight for habits with no deadline


# FixedActivity class -> those are the activities that are fixed in my calendar and that I don't want to move (input schedule form user)
class FixedActivity:
    def __init__(self, name_id, start_time, end_time, day, do_not_disturb=False):
        """
        Represents fixed, non-reschedulable activities.
        :param name_id: Unique identifier for the activity (string)
        :param start_time: Start time (e.g., 08:45)
        :param end_time: End time (e.g., 09:45)
        :param day: Date of the activity (e.g., 2024-12-13)
        :param do_not_disturb: Boolean flag for "do not disturb"
        """
        self.name_id = name_id
        self.start_time = datetime.strptime(start_time, "%H:%M").time()
        self.end_time = datetime.strptime(end_time, "%H:%M").time()
        self.day = datetime.strptime(day, "%Y-%m-%d").date()
        self.do_not_disturb = do_not_disturb

    def duration(self):
        """
        Calculate duration of the free slot in minutes.
        """
        # Use subtract_times function to calculate the difference
        return subtract_times(self.end_time, self.start_time)


# FreeSlot class -> those are the free slots in my calendar, they are caracterized by a start time, an end time and a day
# later on each free slot will also be caracterized by the stress level that the user could tolarete in that time slot
# Abstract Free Time Slot Class
class FreeTimeSlot(ABC):
    def __init__(self, start_time, end_time, day, stress_level):
        """
        Abstract Free Time Slot class, parent of FreeSlot and ScheduledActivity.
        :param start_time: Start time (e.g., 08:45)
        :param end_time: End time (e.g., 09:45)
        :param day: Date of the slot (e.g., 2024-12-13)
        :param stress_level: Stress level associated with the slot (1-5)
        """
        self.start_time = datetime.strptime(start_time, "%H:%M").time()
        self.end_time = datetime.strptime(end_time, "%H:%M").time()
        self.day = datetime.strptime(day, "%Y-%m-%d").date()
        self.stress_level = stress_level

    def duration(self):
        # Calculate duration in hours
        """
        Calculate duration of the free slot in minutes.
        """
        # Use subtract_times function to calculate the difference
        return subtract_times(self.end_time, self.start_time)


# Free Slot Class
class FreeSlot(FreeTimeSlot):
    pass


# Scheduled Activity Class
class ScheduledActivity(FreeTimeSlot):
    def __init__(self, start_time, end_time, day, stress_level, activity_name_id):
        super().__init__(start_time, end_time, day, stress_level)
        self.activity_name_id = activity_name_id


# Day Class
class Day:
    def __init__(self, name, date, waking_up_hour=None, sleeping_hour=None):
        """
        Represents a single day with its fixed activities and free slots.
        :param name: Name of the day (e.g., "Monday")
        :param date: Date of the day (e.g., 2024-12-13)
        :param waking_up_hour: Waking up hour (e.g., 08:00)
        :param sleeping_hour: Sleeping hour (e.g., 22:00)
        """
        self.name = name
        self.date = datetime.strptime(date, "%Y-%m-%d").date()
        self.waking_up_hour = (
            datetime.strptime(waking_up_hour, "%H:%M").time()
            if waking_up_hour
            else None
        )
        self.sleeping_hour = (
            datetime.strptime(sleeping_hour, "%H:%M").time() if sleeping_hour else None
        )
        self.fixed_activities = []  # List of FixedActivity objects
        self.free_slots = []  # List of FreeSlot objects

    def add_fixed_activity(self, fixed_activity):
        self.fixed_activities.append(fixed_activity)

    def add_free_slot(self, free_slot):
        self.free_slots.append(free_slot)


# Week Class
class Week:
    def __init__(self, week_id):
        """
        Represents a week with its days.
        :param week_id: ID for the week (e.g., "Week 1")
        """
        self.week_id = week_id
        self.days = []

    def add_day(self, day):
        """
        Adds a Day object to the week.
        :param day: A Day object to be added to the week.
        """
        self.days.append(day)

    def get_day(self, day_date):
        """
        Returns the Day object with the given date.
        :param day_date: Date of the day to retrieve, in "YYYY-MM-DD" format.
        :return: The Day object with the given date.
        """
        day_date = datetime.strptime(day_date, "%Y-%m-%d").date()
        for day in self.days:
            if day.date == day_date:
                return day
        return None


def reschedule_week(user_week, activity_list):
    """
    Reschedules a given week based on available free slots and activity priorities using Pareto Optimization.
    :param user_week: A Week object representing the user's current schedule.
    :param activity_list: A list of all activities (Habits and Tasks) to be scheduled.
    :return: A rescheduled Week object.
    """
    print("Starting rescheduling process with stress compensation...")

    # Copy the week and activities list to work locally
    rescheduled_week = deepcopy(user_week)
    activities_to_schedule = deepcopy(activity_list)

    # Iterate over each day in the week
    for day in rescheduled_week.days:
        # Skip days without waking or sleeping hours
        if not day.waking_up_hour or not day.sleeping_hour:
            continue

        # Filter free slots
        for free_slot in day.free_slots:
            if isinstance(free_slot, FreeSlot):
                # Calculate priority index for each activity for the current day
                for activity in activities_to_schedule:
                    activity.calculate_priority_index(day.date)

                # Collect Pareto-optimal candidates
                pareto_candidates = []

                for activity in activities_to_schedule:
                    if activity.duration <= free_slot.duration():
                        # Calculate stress compensation (maximize absolute difference)
                        stress_compensation = abs(
                            activity.stress_index - free_slot.stress_level
                        )

                        # If priority index is very high due to deadline, override Pareto considerations
                        if activity.priority_index >= 15:
                            print(
                                f"Warning: Scheduling {activity.name_id} in a slot with high stress mismatch due to urgent deadline."
                            )
                            scheduleActivity(
                                day, free_slot, activity, activities_to_schedule
                            )
                            break

                        # Add the activity as a Pareto candidate
                        pareto_candidates.append(
                            (activity, stress_compensation, activity.priority_index)
                        )

                else:
                    # Identify the Pareto-optimal activity
                    if pareto_candidates:
                        # Maximize stress compensation and priority_index
                        pareto_optimal = sorted(
                            pareto_candidates,
                            key=lambda x: (
                                -x[
                                    1
                                ],  # Maximize stress compensation (absolute difference)
                                -x[2],  # Maximize priority index
                            ),
                        )[0][0]  # Select the best candidate

                        # Schedule the Pareto-optimal activity
                        scheduleActivity(
                            day, free_slot, pareto_optimal, activities_to_schedule
                        )

    return rescheduled_week


def scheduleActivity(day, free_slot, activity, activities_to_schedule):
    """
    Schedule an activity in a free slot of a day.
    :param day: Day object where the activity will be scheduled.
    :param free_slot: FreeSlot object representing the free slot.
    :param activity: Activity object to be scheduled.
    :param activities_to_schedule: The list of activities to update after scheduling.
    """
    # Create a scheduled activity object
    scheduled_activity = ScheduledActivity(
        start_time=free_slot.start_time.strftime("%H:%M"),
        end_time=(
            datetime.combine(datetime.min, free_slot.start_time)
            + timedelta(minutes=activity.duration)
        )
        .time()
        .strftime("%H:%M"),
        day=free_slot.day.strftime("%Y-%m-%d"),
        stress_level=free_slot.stress_level,
        activity_name_id=activity.name_id,
    )

    # If the free slot has more time left, create a new free slot
    if free_slot.duration() > activity.duration + 10:  # Adding a 10-minute break
        new_free_start = (
            datetime.combine(datetime.min, free_slot.start_time)
            + timedelta(minutes=activity.duration + 10)
        ).time()

        new_free_slot = FreeSlot(
            start_time=new_free_start.strftime("%H:%M"),
            end_time=free_slot.end_time.strftime("%H:%M"),
            day=free_slot.day.strftime("%Y-%m-%d"),
            stress_level=free_slot.stress_level,  # Assuming the same stress level initially
        )

        # Add the new free slot to the day
        day.add_free_slot(new_free_slot)

    # Remove the old free slot and add the scheduled activity
    day.free_slots.remove(free_slot)
    day.free_slots.append(scheduled_activity)

    # Update the activities to schedule
    if isinstance(activity, Habit):
        activity.remaining_frequency -= 1
        if activity.remaining_frequency <= 0:
            activities_to_schedule.remove(activity)
    elif isinstance(activity, Task):
        activities_to_schedule.remove(activity)


# example of usage: this was just for testing with a console result before than the front end is ready
# Create a sample week
# week = Week("Week 1")

# Add days to the week
# week.add_day(Day("Monday", "2024-12-25", waking_up_hour="08:00", sleeping_hour="22:00"))
# week.add_day(
#     Day("Tuesday", "2024-12-26", waking_up_hour="08:00", sleeping_hour="22:00")
# )

# Add fixed activities
# week.get_day("2024-12-25").add_fixed_activity(
#     FixedActivity("Work", "09:00", "17:00", "2024-12-25", do_not_disturb=True)
# )
# week.get_day("2024-12-26").add_fixed_activity(
#     FixedActivity("Meeting", "10:00", "12:00", "2024-12-26", do_not_disturb=False)
# )

# Add free slots
# NB -> now the free slots are added manually, later they will be also calculated based on the fixed activities and the time that the user wants to sleep/wake up
# also their stress level will be already calculated by the stress scurve of the user
# week.get_day("2024-12-25").add_free_slot(
#     FreeSlot("18:00", "20:00", "2024-12-25", stress_level=30)
# )
# week.get_day("2024-12-26").add_free_slot(
#     FreeSlot("15:00", "16:30", "2024-12-26", stress_level=60)
# )

# Create a list of activities to schedule
# activities = [
#     Task("Finish Report", 120, "2024-12-28", 5, 80),  # Task with high priority
#     Habit("Exercise", 60, None, 3, 3, 30),  # Habit with 3 remaining frequencies
#     Habit("Meditation", 30, None, 4, 5, 20),  # Habit with 5 remaining frequencies
# ]

# Reschedule the week

# print("Starting rescheduling process...")
# rescheduled_week = reschedule_week(week, activities)

# Display the rescheduled week
# print("Rescheduled Week:")
# for day in rescheduled_week.days:
#     print(f"Day: {day.name}")
#     print("Fixed Activities:")
#     for fixed in day.fixed_activities:
#         print(f"  - {fixed.name_id} from {fixed.start_time} to {fixed.end_time}")
#     print("Scheduled Activities:")
#     for slot in day.free_slots:
#         if isinstance(slot, ScheduledActivity):
#             print(
#                 f"  - {slot.activity_name_id} from {slot.start_time} to {slot.end_time}"
#             )
#     print()

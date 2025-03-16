import pandas as pd
from scipy.signal import butter, filtfilt
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import MinMaxScaler

# Load stress data from CSV file
def load_stress_data(csv_file):
    df = pd.read_csv(csv_file, parse_dates=['timestamp'])
    df.set_index('timestamp', inplace=True)
    return df

# Low pass filter
def low_pass_filter(data, cutoff, fs, order=4):
    nyquist = 0.5 * fs
    normal_cutoff = cutoff / nyquist
    b, a = butter(order, normal_cutoff, btype='low', analog=False)
    filtered_data = filtfilt(b, a, data)
    return filtered_data

# Normalize the signal from 0 to 1
def normalize_signal(dataframe, column_name):
    scaler = MinMaxScaler(feature_range=(0, 1))
    dataframe[column_name] = scaler.fit_transform(dataframe[[column_name]])
    return dataframe

# Apply filter and normalize stress data
def apply_filter_and_normalize(csv_file):
    # Load data
    df = load_stress_data(csv_file)

    # Signal parameters
    fs = 1 / (3 * 60)  # Frequency sampling: 3 minutes
    cutoff_frequency = 0.0005  # Cutoff Frequency

    # Low pass filter
    df['filtered_stress'] = low_pass_filter(df['stress'], cutoff_frequency, fs)

    # Normalize the signal
    df = normalize_signal(df, 'filtered_stress')

    # Save reprocessed data to a new CSV file
    # df.to_csv("filtered_normalized_stress_data.csv")

    return df

# Remove Outliers using IQR Method
def detect_and_remove_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    # Replace outliers with NaN
    df[column] = df[column].apply(lambda x: x if lower_bound <= x <= upper_bound else None)
    
    # Interpolate missing values
    df[column] = df[column].interpolate(method='linear')
    return df

# Example
csv_file = "Name_CSV_File.csv"  # File Path
processed_data = apply_filter_and_normalize(csv_file)

# Removes outliers from the filtered signal
processed_data = detect_and_remove_outliers(processed_data, 'filtered_stress')

# Save preprocessed data to a new CSV file
processed_data.to_csv("Name_CSV_File.csv")

# Visualize Results
#plt.figure(figsize=(12, 6))
#plt.plot(processed_data.index, processed_data['filtered_stress'], label="Normalized Stress (Outliers Removed)", color='blue')
#plt.title("Outlier Detection and Removal")
#plt.xlabel("Time")
#plt.ylabel("Stress Level")
#plt.legend()
#plt.show()
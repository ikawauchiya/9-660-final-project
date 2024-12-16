#################################
### 9.660 FINAL PROJECT MODEL ###
#################################

# Course: 9.660
# Date: 2024-12-16
# Name: Inori Kawauchiya

import os
import numpy as np
from scipy.stats import norm
import pandas as pd


### MODEL DATA ANALYSIS

model_results = pd.read_csv("model_comparisons.csv")
accuracy = (model_results['human_response'] == model_results['model_response']).mean() # How accurate is the model at predicting human responses?
labels = ["shorter", "equal", "longer"]

model_results['pitch_condition'] = model_results['question_id'].str[0]
model_results['interval_label'] = model_results['question_id'].str[1]

accuracy_by_pitch_model = model_results.groupby('pitch_condition').apply(
    lambda df: (df['human_response'] == df['model_response']).mean()
)
accuracy_by_interval_model = model_results.groupby('interval_label').apply(
    lambda df: (df['human_response'] == df['model_response']).mean()
)

human_response_dist_by_pitch_model = model_results.groupby('pitch_condition')['human_response'].value_counts(normalize=True)
model_response_dist_by_pitch_model = model_results.groupby('pitch_condition')['model_response'].value_counts(normalize=True)

print("MODEL RESULTS")
print("Model Prediction Accuracy to Human responses:", accuracy)

print("\nAccuracy by Pitch Condition (Model):")
print(accuracy_by_pitch_model)
print("\nAccuracy by Interval Condition (Model):")
print(accuracy_by_interval_model)
print("\nHuman Response Distribution by Pitch (Model) (proportions):")
print(human_response_dist_by_pitch_model)
print("\nModel Response Distribution by Pitch (proportions):")
print(model_response_dist_by_pitch_model)

### HUMAN DATA ANALYSIS

data = pd.read_csv("trials.csv")

data['pitch_condition'] = data['question_id'].str[0]
data['interval_label'] = data['question_id'].str[1]

interval_map = {'S': 540, 'M': 600, 'L': 660}
data['test_interval'] = data['interval_label'].map(interval_map)

def true_relation(interval):
    if interval < 600:
        return "shorter"
    elif interval == 600:
        return "equal"
    else:
        return "longer"

data['true_relation'] = data['test_interval'].apply(true_relation)

overall_accuracy = (data['response'] == data['true_relation']).mean() # How accurate are human responses to the true pitch intervals?
accuracy_by_pitch_human = data.groupby('pitch_condition').apply(lambda df: (df['response'] == df['true_relation']).mean())
accuracy_by_interval_human = data.groupby('interval_label').apply(lambda df: (df['response'] == df['true_relation']).mean())
human_response_dist_by_pitch_human = data.groupby('pitch_condition')['response'].value_counts(normalize=True)
over_under = data.groupby(['pitch_condition', 'true_relation'])['response'].value_counts(normalize=True)

print("\n\nHUMAN DATA ANALYSIS")
print("Overall Human Accuracy:", overall_accuracy)
print("\nAccuracy by Pitch Condition (Human):")
print(accuracy_by_pitch_human)
print("\nAccuracy by Interval Condition (Human):")
print(accuracy_by_interval_human)
print("\nHuman Response Distribution by Pitch (Human) (proportions):")
print(human_response_dist_by_pitch_human)
print("\nResponse Distribution by Pitch and True Relation (Human) (to assess over/underestimation):")
print(over_under)

with open("results_summary.txt", "w") as f:
    f.write("MODEL RESULTS\n")
    f.write(f"Model Accuracy: {accuracy}\n\n")
    f.write("\n\n")

    f.write("Accuracy by Pitch Condition (Model):\n")
    f.write(accuracy_by_pitch_model.to_string())
    f.write("\n\n")

    f.write("Accuracy by Interval Condition (Model):\n")
    f.write(accuracy_by_interval_model.to_string())
    f.write("\n\n")

    f.write("Human Response Distribution by Pitch (Model) (proportions):\n")
    f.write(human_response_dist_by_pitch_model.to_string())
    f.write("\n\n")

    f.write("Model Response Distribution by Pitch (proportions):\n")
    f.write(model_response_dist_by_pitch_model.to_string())
    f.write("\n\n")

    f.write("HUMAN DATA ANALYSIS\n")
    f.write(f"Overall Human Accuracy: {overall_accuracy}\n\n")
    
    f.write("Accuracy by Pitch Condition (Human):\n")
    f.write(accuracy_by_pitch_human.to_string())
    f.write("\n\n")
    
    f.write("Accuracy by Interval Condition (Human):\n")
    f.write(accuracy_by_interval_human.to_string())
    f.write("\n\n")

    f.write("Human Response Distribution by Pitch (Human) (proportions):\n")
    f.write(human_response_dist_by_pitch_human.to_string())
    f.write("\n\n")

    f.write("Response Distribution by Pitch and True Relation (Human):\n")
    f.write(over_under.to_string())
    f.write("\n")

#################################
### 9.660 FINAL PROJECT MODEL ###
#################################

# Course: 9.660
# Date: 2024-12-16
# Name: Inori Kawauchiya

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

model_results = pd.read_csv("model_comparisons.csv")
data = pd.read_csv("trials.csv")

model_results['pitch_condition'] = model_results['question_id'].str[0]
model_results['interval_label'] = model_results['question_id'].str[1]

data['pitch_condition'] = data['question_id'].str[0]
data['interval_label'] = data['question_id'].str[1]

def determine_relation(interval):
    if interval < 600:
        return "shorter"
    elif interval == 600:
        return "equal"
    else:
        return "longer"

interval_map = {'S': 540, 'M': 600, 'L': 660}
data['test_interval'] = data['interval_label'].map(interval_map)

data['true_relation'] = data['test_interval'].apply(determine_relation)

# FIGURE 1: Bar plot, human vs. model accuracy by pitch
acc_by_pitch_human = data.groupby('pitch_condition').apply(lambda df: (df['response']==df['true_relation']).mean())
acc_by_pitch_model = model_results.groupby('pitch_condition').apply(lambda df: (df['human_response']==df['model_response']).mean())

acc_df = pd.DataFrame({
    'Pitch Condition': acc_by_pitch_human.index,
    'Human Accuracy': acc_by_pitch_human.values,
    'Model Accuracy': acc_by_pitch_model.values
})

plt.figure(figsize=(6,4))
acc_melted = acc_df.melt(id_vars='Pitch Condition', value_vars=['Human Accuracy','Model Accuracy'],
                         var_name='Source', value_name='Accuracy')
sns.barplot(x='Pitch Condition', y='Accuracy', hue='Source', data=acc_melted)
plt.title("Accuracy by Pitch Condition: Human vs. Model")
plt.ylim(0,1)
plt.legend()
plt.tight_layout()
plt.savefig("accuracy_by_pitch.png")
plt.close()

# FIGURE 2: Model vs. Human response distribution by pitch
human_dist = data.groupby(['pitch_condition','response']).size().groupby(level=0).apply(lambda x: x/x.sum()).reset_index(name='Proportion')
human_dist['Source'] = 'Human'

model_dist = model_results.groupby(['pitch_condition','model_response']).size().groupby(level=0).apply(lambda x: x/x.sum()).reset_index(name='Proportion')
model_dist['Source'] = 'Model'

dist_combined = pd.concat([human_dist.rename(columns={'response':'Response'}),
                           model_dist.rename(columns={'model_response':'Response'})])

plt.figure(figsize=(6,4))
sns.barplot(x='pitch_condition', y='Proportion', hue='Response', data=dist_combined[dist_combined['Source']=='Human'])
plt.title("Human Response Distribution by Pitch")
plt.ylim(0,1)
plt.tight_layout()
plt.savefig("human_distribution_by_pitch.png")
plt.close()

plt.figure(figsize=(6,4))
sns.barplot(x='pitch_condition', y='Proportion', hue='Response', data=dist_combined[dist_combined['Source']=='Model'])
plt.title("Model Response Distribution by Pitch")
plt.ylim(0,1)
plt.tight_layout()
plt.savefig("model_distribution_by_pitch.png")
plt.close()



# -*- coding: utf-8 -*-
"""
Created on Fri May  5 13:39:22 2023

@book_author: TISHA
"""


import numpy as np#importing the numpy library
import pandas as pd#importing the pandas library
#import seaborn as sns#importing the seaborn library
#import matplotlib.pyplot as plt#importing the matplot library
 
dataset = pd.read_csv('Preprocessed_data.csv') #reading the dataset
dataf=dataset.drop(['Unnamed: 0'], axis=1)#dropping the unnamed column

dataf.head()

df= dataf.copy()
df.dropna(inplace=True)
df.reset_index(drop=True, inplace=True)


df.drop(columns = ['isbn','author',
                   'image','age',
                   'year_of_publication'],axis=1,inplace = True) 

df.drop(index=df[df['rating'] == 0].index, inplace=True) #remove 0 in rating
df.head()

num_rating= df.groupby('title').count()['rating'].reset_index()
num_rating.rename(columns={'rating': 'num_ratings'}, inplace=True)

avg_rating= df.groupby('title').mean()['rating'].reset_index()
avg_rating.rename(columns={'rating': 'avg_ratings'}, inplace=True)

popular= num_rating.merge(avg_rating, on='title')
popular[popular['num_ratings']>=1].sort_values('avg_ratings')
popular_df= popular[popular['num_ratings']>=180].sort_values('avg_ratings', ascending= False).head(30)
popular_df.merge(dataset, on='title').drop_duplicates('title').shape
popular_df= popular_df.merge(dataset, on='title').drop_duplicates('title')[['title','author','image','num_ratings', 'avg_ratings', 'price']]

x= df.groupby('user_id').count()['rating']>150
experienced_users= x[x].index

filtered_on_users= df[df['user_id'].isin(experienced_users)]

y= filtered_on_users.groupby('title').count()['rating']>=8
famous_books= y[y].index # boolean indexing

final_ratings= filtered_on_users[filtered_on_users['title'].isin(famous_books)]
final_ratings.drop_duplicates
final_ratings

pt= final_ratings.pivot_table(index= 'title', columns= 'user_id', values='rating')
pt.fillna(0, inplace= True)
pt

from sklearn.metrics.pairwise import cosine_similarity
similarity_score= cosine_similarity(pt)
similarity_score.shape #book-to-book

def recommend(book_title):
    # index number fetch
    index= np.where(pt.index== book_title)[0][0]
    similar_items = sorted(list(enumerate(similarity_score[index])), key= lambda x:x[1], reverse= True)[1:6]
    data=[]
    for i in similar_items:
        item=[]
        #print(pt.index[i[0]])
        temp_df =dataset[dataset['title']== pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('title')['title'].values))
        item.extend(list(temp_df.drop_duplicates('title')['author'].values))
        item.extend(list(temp_df.drop_duplicates('title')['image'].values))
        data.append(item)
    return data

import pickle
pickle.dump(popular_df, open('popular1.pkl','wb'))
pickle.dump(pt, open('pt1.pkl','wb'))
pickle.dump(dataset, open('books1.pkl','wb'))
pickle.dump(similarity_score, open('similarity_score1.pkl','wb'))

def RecomendCategory(df, category):
    filtered_df = df[df['Category'] == category]
    filtered_df = filtered_df[filtered_df['rating'] >=9]
    filtered_df = filtered_df.drop_duplicates(subset='title')
    filtered_df = filtered_df.merge(dataf, on='title').drop_duplicates('title')[['title', 'author', 'image']]
    return filtered_df


med_df     = RecomendCategory(df, "['Medical']")
fiction_df = RecomendCategory(df, "['Fiction']") #1
hist_df = RecomendCategory(df, "['History']")
help_df = RecomendCategory(df, "['Self-Help']")  #2
cook_df = RecomendCategory(df, "['Cooking']")



pickle.dump(med_df, open('med.pkl','wb'))
pickle.dump(fiction_df, open('fiction.pkl','wb'))
pickle.dump(help_df, open('selfhelp.pkl','wb'))
pickle.dump(cook_df, open('cooking.pkl','wb'))
pickle.dump(hist_df, open('history.pkl','wb'))
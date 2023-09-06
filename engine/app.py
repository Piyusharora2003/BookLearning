from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app= Flask(__name__)

cors_options = {
    "origins": "http://localhost:5000", 
    "credentials": True,               # Set access-control-allow-credentials to true
    "options_success_status": 200      # Set the success status for pre-flight OPTIONS requests
}
CORS(app, **cors_options, supports_credentials=True,methods=["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"])

popular_df= pickle.load(open('popular1.pkl', 'rb'))
books= pickle.load(open('books1.pkl', 'rb'))
similarity_score= pickle.load(open('similarity_score1.pkl', 'rb'))
pt= pickle.load(open('pt1.pkl', 'rb'))
cooking= pickle.load(open('cooking.pkl', 'rb'))
fiction= pickle.load(open('fiction.pkl', 'rb'))
history= pickle.load(open('history.pkl', 'rb'))
med= pickle.load(open('med.pkl', 'rb'))
selfhelp= pickle.load(open('selfhelp.pkl', 'rb'))


@app.route('/popular')
def index():
    book_names = popular_df['title'].to_list()
    #authors = popular_df['author'].to_list()
    #images = popular_df['image'].to_list()
    votes = popular_df['num_ratings'].to_list()
    #ratings = popular_df['avg_ratings'].to_list()
    #describe= popular_df['Summary'].to_list()
    return jsonify({
            "title": book_names,
            #"Author": authors,
            #"Image": images,
            "Votes": votes,
            #"rating": ratings,
            #"summary":describe
    })


@app.route('/test',methods=['GET'])
def test():
    return jsonify({
        "message":"reseone"
        })


@app.route('/recommend', methods=['GET'])

def recommend_ui():
    return render_template('recommend.html',
                            Book_name= list(popular_df['title'].values),
                            Author= list(popular_df['author'].values),
                            Image=list(popular_df['image'].values),
                            Votes=list(popular_df['num_ratings'].values),
                            Rating=list(popular_df['avg_ratings'].values)
                            )


@app.route('/fiction',methods=['GET'])
def fic():
    bookname = (fiction['title'].to_list())[0:50]
    author = (fiction['author'].to_list())[0:50]
    Image = (fiction['image'].to_list())[0:50]

    return jsonify({
        "book": bookname,
        "author":author,
        "image":Image,
        })

@app.route('/selfhelp')
def selfhelps():
    bookname = (selfhelp['title'].to_list())[0:50]
    author = (selfhelp['author'].to_list())[0:50]
    Image = (selfhelp['image'].to_list())[0:50]

    return jsonify({
        "book": bookname,
        "author":author,
        "image":Image,
        })


@app.route('/cooking',methods=['GET'])
def cook():
    bookname = (cooking['title'].to_list())[0:50]
    author = (cooking['author'].to_list())[0:50]
    Image = (cooking['image'].to_list())[0:50]

    return jsonify({
        "book": bookname,
        "author":author,
        "image":Image,
        })

@app.route('/history',methods=['GET'])
def hist():
    bookname = (history['title'].to_list())[0:50]
    author = (history['author'].to_list())[0:50]
    Image = (history['image'].to_list())[0:50]

    return jsonify({
        "book": bookname,
        "author":author,
        "image":Image,
        })

@app.route('/medical',methods=['GET'])
def medi():
    bookname = (med['title'].to_list())[0:50]
    author = (med['author'].to_list())[0:50]
    Image = (med['image'].to_list())[0:50]

    return jsonify({
        "book": bookname,
        "author":author,
        "image":Image,
        })



@app.route('/recommend_books', methods=['POST'])
def recommend():
    data = request.get_json()
    user_input = data.get("query")
#    user_input = "Empire Falls"
    try:
        index = np.where(pt.index == user_input)[0][0]
        similar_items = sorted(list(enumerate(similarity_score[index])), key=lambda x: x[1], reverse=True)[1:6]
        data = []
        for i in similar_items:
            item = {}
            temp_df = books[books['title'] == pt.index[i[0]]]
            item["title"] = list(temp_df.drop_duplicates('title')['title'].values)[0]
            #item.extend(list(temp_df.drop_duplicates('title')['title'].values))
            #item.extend(list(temp_df.drop_duplicates('title')['author'].values))
            #item.extend(list(temp_df.drop_duplicates('title')['image'].values))
            data.append(item)
        return jsonify({
            "data":data
            })
    except:
        return jsonify({
            "data":[],
            "message":"lol"
        })

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=1000)
    
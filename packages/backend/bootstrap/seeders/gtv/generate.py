from faker import Faker
import uuid
import json
import time
import bcrypt

videoImages = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"
]

videoUrls = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
]

# function to encrypt password using bcrypt
def encrypt_password(password):
    hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    return hash.decode()

fake = Faker()

creators = []
for i in range(5):
    creator = {
        "id": str(uuid.uuid4()),
        "createdAt": int(time.time()),
        "updatedAt": int(time.time()),
        "email": fake.email(),
        "name": fake.name()
    }
    creators.append(creator)

json_data = json.dumps(creators)

with open('creator.json', 'w') as f:
    f.write(json_data)


credentials = []

for i in range(5):
    credential = {
        "id": str(uuid.uuid4()),
        "createdAt": int(time.time()),
        "updatedAt": int(time.time()),
        "credentialType": "password",
        "credentialValue": encrypt_password(fake.password()),
        "userId": creators[i]["id"]
    }
    credentials.append(credential)

json_data = json.dumps(credentials)

with open('credential.json', 'w') as f:
    f.write(json_data)


follows = []

for i in range(3):
    follow = {
        "followerId": creators[i]["id"],
        "followingId": creators[i+1]["id"],
        "createdAt": int(time.time()),
        "updatedAt": int(time.time()),
    }
    follows.append(follow)

json_data = json.dumps(follows)

with open('follow.json', 'w') as f:
    f.write(json_data)

videos = []

for i in range(10):
    video = {
        "id": str(uuid.uuid4()),
        "createdAt": int(time.time()),
        "updatedAt": int(time.time()),
        "title": fake.sentence(),
        "description": fake.paragraph(),
        "publishedAt": int(time.time()),
        "isPublished": fake.boolean(),
        "videoUrl": videoUrls[i],
        "creatorId": creators[i % (len(creators)-1)]["id"],
    }
    videos.append(video)

json_data = json.dumps(videos)

with open('video.json', 'w') as f:
    f.write(json_data)


likes = []

for i in range(10):
    like = {
        "videoId": videos[i]["id"],
        "creatorId": creators[i % (len(creators)-1)]["id"],
        "createdAt": int(time.time()),
        "updatedAt": int(time.time())
    }
    likes.append(like)

json_data = json.dumps(likes)

with open('like.json', 'w') as f:
    f.write(json_data)

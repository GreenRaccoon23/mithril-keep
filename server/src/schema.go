package main

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

// User collection
type User struct {
	Id        bson.ObjectId `json:"userId" bson:"_id,omitempty"`
	CreatedAt time.Time     `json:"createdAt" bson:"created_at"`
	Username  string        `json:"username"`
	Password  string        `json:"password"`
	Fullname  string        `json:"fullname"`
	Notes     []Note        `json:"notes"`
	Token     string        `json:"token"`
}

// Note object for User.Notes[] slice
type Note struct {
	Id              bson.ObjectId `json:"noteId" bson:"_id,omitempty"`
	CreatedAt       time.Time     `json:"createdAt" bson:"created_at"`
	Title           string        `json:"title"`
	ColorBackground string        `json:"colorBackground" bson:"color_background"`
	IsChecklist     bool          `json:"isChecklist" bson:"is_checklist"`
}

// Item object for User.Notes[i].Items[] slice
type Item struct {
	CheckboxState string `json:"checkboxState" bson:"checkbox_state"`
	Text          string `json:"text"`
}

// Story Model - separate collection
type Story struct {
	Id            bson.ObjectId `json:"storyId" bson:"_id,omitempty"`
	CreatedAt     time.Time     `json:"createdAt" bson:"created_at"`
	Title         string        `json:"title"`
	Description   string        `json:"description"`
	HasSoundtrack bool          `json:"hasSoundtrack" bson:"has_soundtrack"`
	Thumbnail     string        `json:"thumbnail"`
	Username      string        `json:"username"`
	Author        string        `json:"author"`
	Views         int           `json:"views"`
	Tags          []string      `json:"tags"`
	Votes         []Vote        `json:"votes"`
	VoteCount     int           `json:"voteCount" bson:"voteCount"`
	Frames        []Frame       `json:"frames"`
	FRAME1        int
	FRAME2        int
	FRAME3        int
}

// Frame model for Acts/Scenes
type Frame struct {
	// 0 for video, 1 for image, 2 for txt2speech, 3 for audio track
	MediaType      int      `json:"mediaType"`
	Player         struct{} `json:"player"`
	PlayerDiv      string   `json:"playerDiv"`
	VideoId        string   `json:"videoId"`
	Start          float32  `json:"start"`
	End            float32  `json:"end"`
	Volume         int      `json:"volume"`
	PreviewUrl     string   `json:"previewUrl" bson:"previewurl"`
	ImageUrl       string   `json:"imageUrl" bson:"imageurl"`
	ImageDuration  int      `json:"imageDuration"`
	NarrationText  string   `json:"narrationText"`
	NarrationDelay float32  `json:"narrationDelay"`
	AudioId        string   `json:"audioId"`
	AudioStart     float32  `json:"audioStart"`
	AudioVolume    float32  `json:"audioVolume"`
}

// Vote Model - separate collection
type Vote struct {
	StoryId   string `json:"storyId" bson:"-"`
	Username  string `json:"username"`
	Direction string `json:"direction"`
}

// JSON object
type Object map[string]interface{}

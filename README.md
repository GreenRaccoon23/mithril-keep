# Mithril Keep
http://mithril-keep.herokuapp.com/

Note-taking app written in Mithril.  

# Technical Documentation

## Installation

```
$ git clone https://github.com/GreenRaccoon23/mithril-keep.git
$ cd mithril-keep
$ bower install
$ cd server
$ ./serve (for Linux/Mac)
$ /bin/server.exe (for Windows)
```

Now visit [localhost:1966](http://localhost:1966/)

## Testing  

Skip this section; tests haven't been written yet.

Start server:  
```
$ mithril-keep/server/serve
```

Then in another Terminal window:  
```
$ cd mithril-keep/server/src
$ go test -v
```

### Architecture Overview

The tech stack is Mithril, Go, and MongoDB.

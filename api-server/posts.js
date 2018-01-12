const clone = require('clone')
const uuidv4 = require('uuid/v4')
const config = require('./config')
const users = require('./users')
let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdxx53nd": {
    id: '8xf0y6ziyjabvozdxx53nd',
    timestamp: 1515638807 ,
    title: 'Fractal',
    body: 'A fractal is a never-ending pattern. Fractals are infinitely complex patterns that are self-similar across different scales. They are created by repeating a simple process over and over in an ongoing feedback loop. Driven by recursion, fractals are images of dynamic systems – the pictures of Chaos. Geometrically, they exist in between our familiar dimensions. Fractal patterns are extremely familiar, since nature is full of fractals. For instance: trees, rivers, coastlines, mountains, clouds, seashells, hurricanes, etc. Abstract fractals – such as the Mandelbrot Set – can be generated by a computer calculating a simple equation over and over.',
    author: 'Manh',
    category: 'misc',
    voteScore: 1,
    mediaType:"image",
    mediaUrl:config.origin +"/public/learned_b.jpg",
    deleted: false,
    commentCount: 0
  },
  "8xf0y6ziyjabvozdxx66nd": {
    id: '8xf0y6ziyjabvozdxx66nd',
    timestamp: 1515638807 ,
    title: 'Quantum Computing |101>',
    body: 'Quantum computing is computing using quantum-mechanical phenomena, such as superposition and entanglement.[1] A quantum computer is a device that performs quantum computing. They are different from binary digital electronic computers based on transistors. Whereas common digital computing requires that the data be encoded into binary digits (bits), each of which is always in one of two definite states (0 or 1), quantum computation uses quantum bits, which can be in superpositions of states. A quantum Turing machine is a theoretical model of such a computer, and is also known as the universal quantum computer. The field of quantum computing was initiated by the work of Paul Benioff (de)[2] and Yuri Manin in 1980,[3] Richard Feynman in 1982,[4] and David Deutsch in 1985.[5] A quantum computer with spins as quantum bits was also formulated for use as a quantum spacetime in 1968.',
    author: 'Manh Le',
    category: 'misc',
    voteScore: 2,
    mediaType:"image",
    mediaUrl:config.origin +"/public/q-banner.png",
    deleted: false,
    commentCount: 0
  },
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1513403153,
    title: 'Udacity is the best place to learn React',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    author: 'Manh',
    category: 'react',
    voteScore: 6,
    mediaType:"image",
    mediaUrl:config.origin +"/public/patt (3).jpg",
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1513403153,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Le',
    category: 'redux',
    mediaType:"image",
    mediaUrl:config.origin +"/public/patt (4).jpg",
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "6ni6ok3ym7mf1p33lnxe": {
    id: '6ni6ok3ym7mf1p33lnxe',
    timestamp: 1513730380,
    title: 'Getting started with React & Redux',
    body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    author: 'mle',
    category: 'redux',
    mediaType:"image",
    mediaUrl:config.origin +"/public/patt (2).png",
    voteScore: 2,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
    const keys = Object.keys(data);
    keys.forEach(k=>{
      const d = data[k]
      d["authorData"] = users.getUser(d.author)
    })    
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token);    
    const id = uuidv4();
    
    posts[id] = {
      id: id,
      timestamp: Math.floor(Date.now()/1000),
      title: post.title,
      body: post.body,
      author: post.author,
      authorData: users.getUser(post.author),
      category: post.category,
      mediaType:post.mediaType,
      mediaUrl:post.mediaUrl,
      voteScore: 0,
      deleted: false,
      commentCount: 0
    }

    res(posts[id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}

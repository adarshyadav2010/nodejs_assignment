const express=require('express');
const mongoose=require('mongoose');
// require('./src/schema/schema')
const app=express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://0.0.0.0:27017/assignment')
.then(()=>{
    console.log('connected to mongodb')
})
.catch((e)=>{
    console.log('error connecting to mongodb')
})


// user schema
const userSchema=new mongoose.Schema({
    // name, email, password
    name: String,
    email:{
        type: String,
        unique: true
    },
    password: String
})

const User = mongoose.model('User', userSchema);


// post schema
const postSchema = new mongoose.Schema({
    // title, body, image, user
    title: String,
    body: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const Post =new mongoose.model('Post', postSchema);

app.use(express.json());

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    } else {
      const token = generateToken(user);
      res.json({ status: 'success', token });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});



// Middleware to verify JWT token
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ status: 'error', message: 'Authentication required' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, 'secret_key');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
  }
  
  // Get all posts
  app.get('/posts', authenticate, async (req, res) => {
    try {
      const posts = await Post.find().populate('user', 'name');
      res.json({ posts });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });
  
  // Create a post
  app.post('/posts', authenticate, async (req, res) => {
    try {
      const { title, body, image } = req.body;
      const post = new Post({ title, body, image, user: req.user._id });
      await post.save();
      res.status(201).json({ status: 'success', data: post });
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });
  
  // Update a post
  app.put('/posts/:postId', authenticate, async (req, res) => {
    try {
      const { title, body, image } = req.body;
      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId, user: req.user._id },
        { title, body, image },
        { new: true }
      );
      if (!post) {
        res.status(404).json({ status: 'error', message: 'Post not found' });
      } else {
        res.json({ status: 'success', data: post });
      }
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });
  
  // Delete a post
  app.delete('/posts/:postId', authenticate, async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({ _id: req.params.postId, user: req.user._id });
      if (!post) {
        res.status(404).json({ status: 'error', message: 'Post not found' });
      } else {
        res.json({ status: 'success', message: 'Post deleted' });
      }
    } catch (error) {
      res.status(400).json({ status: 'error', message: error.message });
    }
  });
  


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
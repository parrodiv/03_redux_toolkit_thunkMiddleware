import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionsButtons from './ReactionsButtons'

const PostsList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(getPostsStatus)
  const postsError = useSelector(getPostsError)

  useEffect(() => {
    if (postsStatus === 'idle'){
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])


  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  //slice is going to create a copy of the posts array
  //localCompare will return -1 or 1 based on if one is greater than the other

  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} /> 
      </p>
      <ReactionsButtons post={post} />
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  )
}

export default PostsList

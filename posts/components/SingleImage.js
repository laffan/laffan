
const SingleImage = ({slug, url}) => {
  return (
    <div className="SingleImage">
      <img src={`/posts/projects/${slug}/${url}`} />
    </div>
)};

export default SingleImage;

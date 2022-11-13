export const VideoCard = ({ thumbnail }) => {
    return (
        <img
            src={thumbnail.url}
            alt={thumbnail.title}
            className="card"
            height="150"
        />
    )
}
import { VideoCard } from "./VideoCard"

export const Section = ({ genre, videos }) => {
    return (
        <div className="genre">
            <h3>{ genre }</h3>
            <ul className="genre-feed">
                {videos && videos.map(video =>
                    <li className="genre-feed__card" key={video.id}>
                        <a href={`/video/${video.slug}`}>
                            <VideoCard thumbnail={video.thumbnail} />
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}


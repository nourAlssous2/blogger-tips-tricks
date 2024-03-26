import Comment from "../Comment/Comment";

export default function BlogComments() {
    return (
        <div className="flex flex-col gap-1">
            <Comment />
            <Comment />
            <Comment />
        </div>
    )
}

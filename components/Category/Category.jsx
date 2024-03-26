import Link from "next/link";

export default function Category(props) {
    const translates = props.translates
    
    return (
        <div className="flex flex-col rounded-md" style={{background: props.mainColor}}>
            <b className="p-2 text-center text-white text-xl">{props.categoryText}</b>
            <div className="flex flex-col items-center p-2 h-full" style={{background: props.secondryColor}}>
                <p className="text-white text-center">{translates.categories.descripeCategory(props.categoryText.toLowerCase())}</p>
                <i className={`fa ${props.icon} text-white text-3xl`}></i>
            </div>
            <Link href={`/blogs/category/${props.category.toLowerCase()}`} className="text-center p-2 text-white">{translates.allBlogs}</Link>
        </div>
    )
}

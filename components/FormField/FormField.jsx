import ValidationError from "../ValidationError/ValidationError";

export default function FormField(props) {
    return (
        <div className="flex flex-col">
            <label htmlFor={props.id}>{props.label}:</label>
            <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.name} className="outline-none border border-sky-400 p-1 dark:bg-dark" defaultValue={props.defaultValue} />
            <ValidationError errors={props.errors} />
        </div>
    )
}

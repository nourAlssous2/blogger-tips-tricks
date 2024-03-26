export default function ValidationError({ errors }) {
    return (
        <>
            {errors ? errors?.map((error, key) => <p key={key} className="text-red-500">{error}</p>) : null}
        </>
    )
}

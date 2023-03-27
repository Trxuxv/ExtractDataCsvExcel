
const row = (arr) => {

    console.log(arr)


    return (
        <>
            {
                arr.map(x => (
                    <td>
                        <span>{x}</span>
                        <input />
                    </td>
                )
                )

            }
        </>
    )
}

export default row;
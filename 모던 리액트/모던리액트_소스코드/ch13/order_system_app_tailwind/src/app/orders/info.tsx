const Info = (props:{item: any}) => {
    return (
      <>
        <td className="row">
            <div className="flex items-center">
                <div className="ml-3">
                    <p className="column">{props.item.name}</p>
                </div>
            </div>
        </td>
        <td className="row">
            <p className="column">{props.item.price}</p>
        </td>
        <td className="row">
            <p className="column">{props.item.quantity}</p>
        </td>
      </>  
    );
}

export default Info;
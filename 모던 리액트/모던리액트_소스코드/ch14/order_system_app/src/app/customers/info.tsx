const Info = (props) => {
    return (
        <>
        <td className="row">
            <div className="flex items-center">
                <div className="ml-3">
                    <p className="column">{props.customer.name}</p>
                </div>
            </div>
        </td>
        <td className="row">
            <p className="column">{props.customer.address}</p>
        </td>
        <td className="row">
            <p className="column">{props.customer.email}</p>
        </td>
      </>  
    );
}

export default Info;
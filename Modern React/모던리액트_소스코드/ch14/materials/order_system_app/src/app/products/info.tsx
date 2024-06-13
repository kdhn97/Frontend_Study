const Info = (props:{product: Product}) => {
    return (
      <>
        <td className="row">
            <div className="flex items-center">
                <div className="ml-3">
                    <p className="column">{props.product.name}</p>
                </div>
            </div>
        </td>
        <td className="row">
            <p className="column">{props.product.description}</p>
        </td>
        <td className="row">
            <p className="column">{props.product.price}</p>
        </td>
      </>  
    );
}

export default Info;


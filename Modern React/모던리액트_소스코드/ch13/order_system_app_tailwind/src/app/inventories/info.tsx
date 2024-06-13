const Info = (props: {inventory: Inventory}) => {
    return (
      <>
        <td className="row">
            <div className="flex items-center">
                <div className="ml-3">
                    <p className="column">{props.inventory.name}</p>
                </div>
            </div>
        </td>
        <td className="row">
            <p className="column">{props.inventory.quantity}</p>
        </td>
      </>  
    );
}
export default Info;


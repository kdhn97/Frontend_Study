type MenuProps = {
    icon: string,
    href: string
};
type CustomerProps = {
    info?: Customer,
    customer?: Customer,
    setEditable?: Dispatch<SetStateAction<boolean>>,
    isEditable?: boolean
};
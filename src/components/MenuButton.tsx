type MenuButtonProps = {
	onClickFunction: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
	children?: React.ReactNode;
	id?: string;
};

const MenuButton = (props: MenuButtonProps) => {
	return (
		<button
			id={props?.id}
			onClick={props.onClickFunction}
			className={`mx-2 rounded-2xl bg-zinc-50 px-4 py-1 text-base hover:bg-zinc-200`}
		>
			{props.children}
		</button>
	);
};

export default MenuButton;

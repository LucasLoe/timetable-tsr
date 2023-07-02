const Header = ({ title }: {title: string}): JSX.Element => {
	return (
		<div className='flex h-full w-full pl-4 align-middle'>
			<h1 className='my-auto text-4xl font-semibold uppercase tracking-wider'>{title}</h1>
		</div>
	);
};

export default Header;

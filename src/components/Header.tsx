const Header = ({ title }: { title: string }): JSX.Element => {
	return (
		<div className='flex h-[5vh] w-full pl-4 align-middle'>
			<h1 className='my-auto text-2xl font-semibold uppercase tracking-wider'>{title}</h1>
		</div>
	);
};

export default Header;

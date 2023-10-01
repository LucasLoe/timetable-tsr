import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FontAwesomeButtonProps = {
	id?: string;
	onClickFunction: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
	fontIconString: IconProp;
};

const FontAwesomeButton = (props: FontAwesomeButtonProps) => {
	return (
		<button id={props?.id} onClick={props.onClickFunction}>
			<FontAwesomeIcon
				icon={props.fontIconString}
				className='fa fa-lg my-auto ml-0.5 mr-1 text-zinc-50 hover:bg-slate-300'
			/>
		</button>
	);
};

export default FontAwesomeButton;

import { useEffect } from "react";

export default function useAutoFocusOnRender(ref: React.RefObject<HTMLInputElement>) {
	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, []);
}

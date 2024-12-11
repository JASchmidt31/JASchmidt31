import { useAppStore } from "../store/AppStore";
import ClickableList from "../ui/ClickableList";

export default function ProgramView() {

    const store = useAppStore()

    return (
        <>
        {store.isLoggedIn} && {
            <ClickableList data={[]} onItemPress={function (item: string): void {
                throw new Error("Function not implemented.");
            } } />
        }
        </>
    )
}
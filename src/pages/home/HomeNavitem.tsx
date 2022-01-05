import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent } from "react";

interface HomeNavItemProps {
    title: string;
    message: string;
    path: string;
}
 
const HomeNavItem: FunctionComponent<HomeNavItemProps> = ({title, message, path}) => {
    return (
        <a className={`flex flex-col mb-12 px-12 py-8`} href={path}>
            <div className="flex items-center">
                <span className="text-2xl font-bold mr-3">{title}</span>
                <div className="pt-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
            <span>{message}</span>
        </a>
    );
}
 
export default HomeNavItem;
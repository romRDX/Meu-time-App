import styles from './userItem.module.scss';
import { User } from "../../types"

interface UserItemProps {
    user: User;
}

const UserItem = ({ user }: UserItemProps) => {
    
    return (
        <div className={styles.userItem}>
            <div>
                <span>
                    <b>{ user.FirstNameLastName}</b>
                    <p>{ user.JobTitle}</p>
                </span>
                <img loading='lazy' src="/meta-logo.png" alt="House property" />
            </div>
            <p>{ user.Company}</p>
            <div>
                <p><span>Email Address: </span> { user.EmailAddress}</p>
                <p><span>Email: </span><br /> { user.Email}</p>
                <p><span>Phone: </span> { user.Phone}</p>
            </div>
        
            <div />
        </div>
    )
};

export default UserItem;

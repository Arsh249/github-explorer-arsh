export default function UserCard({user,onClick}){
 return <div className="card" onClick={()=>onClick(user.login)}>
     <img src={user.avatar_url} width="60" alt={user.login} />
     <p>{user.login}</p>
     <span>@{user.login}</span>
 </div>
}

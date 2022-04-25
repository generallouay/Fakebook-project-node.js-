function Account(name , email , password){
    name = name.trim();
    email = email.trim();
    password = password.trim();

    this.name = name;
    this.email = email;
    this.password = password;
    this.friends = [];
    this.notifications = [];
    this.friendRequests = [];
    this.posts = [];
    this.pageId = Math.round(Math.random() * 1000) + "fb" +  Date.now();
    this.profilePicturePath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgYHQLH78Sqfe1-DHsMWe_BVKgWmxj293lw&usqp=CAU';
    this.intro = {
        bio : 'No bio yet!',
        study: 'unset',
        work: 'unset',
        residency : 'unset',
        origin : 'unset',
        relationshipStatus : 'Single',
    }
}
module.exports = {
    Account : Account,
    
};

const userProfile: IUserProfile = {
    userId: 1,
    avatar: 'https://mekoong.com/wp-content/uploads/2022/11/pexels-ron-lach-7792647-scaled.jpg',
    fullname: 'Lê Sơn Tùng',
    username: 'kakabear',
    role: 'Admin',
    email: 'songtungit@gmail.com',
    gender: 'Male',
    phone: '0853822549',
    birthday: new Date('2001-05-19'),
    address: '1234 Main St, City, State 12345',
};
export default userProfile;

interface IUserProfile {
    userId: number;
    avatar: string;
    fullname: string;
    username: string;
    role: string;
    email: string;
    gender: string;
    phone: string;
    birthday: Date;
    address: string;
}

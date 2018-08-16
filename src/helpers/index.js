import titleize from 'titleize'


//这个写法是个简写，应该是 ：
// const rentalType = (isShared) =>{ if (isShared) return xxx ...}, 如此可以见rental type是有argument的，为isshared这个boolean。
export const rentalType = isShared => isShared ? 'shared' : 'available';

export const toUpperCase = value => value? titleize(value) : '';
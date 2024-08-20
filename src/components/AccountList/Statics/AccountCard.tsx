import { Grid } from '@mui/material'
import { useAppSelector } from '../../../services/store/store'


const AccountCard = () => {
    const { accountStatics} = useAppSelector(state=>state.revenues);
    console.log(accountStatics);
    
  return (
    <>
            {accountStatics && (
        <Grid container rowGap={3} columnGap={5}>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Tổng tài khoản:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.totalAccounts}</span>
                </div>
            </Grid>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Tổng nhân viên:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.totalEmployeeCount}</span>
                </div>
            </Grid>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Nhân viên cửa hàng:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.employeeByStoreCount}</span>
                </div>
            </Grid>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Quản trị viên:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.accountsByRole.Admin}</span>
                </div>
            </Grid>
          
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>QL. Thương hiệu:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.accountsByRole.Brand_Manager}</span>
                </div>
            </Grid>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>QL. Cửa hàng:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.accountsByRole.Store_Manager}</span>
                </div>
            </Grid>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Nhân viên:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.accountsByRole.Staff}</span>
                </div>
            </Grid>
            <Grid md={3}>
                <div className='border border-gray-400 p-4 flex flex-col rounded-lg shadow-md'>
                    <span className='text-xl font-semibold text-gray-700'>Khách hàng:</span>
                    <span className='text-xl font-semibold text-green-600'>{accountStatics.accountsByRole.Customer}</span>
                </div>
            </Grid>
        </Grid>
            )}

        </>
  
  )
}

export default AccountCard
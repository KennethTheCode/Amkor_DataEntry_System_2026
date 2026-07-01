import React from 'react'
import DashboardNavBar from '../Components/DashboardNavBar'
import EmployeeTable from '../Components/EmployeeTable'
import AddEmployee from '../Components/CRUD/AddEmployee'
import Footer from '../Components/Footer'

function Dashboard() {
    return (
        <div>
            <DashboardNavBar/>
            <div className='bg-gray-100 h-[87vh] mx-[3vh] p-2 flex overflow-hidden justify-center gap-3'>
                <EmployeeTable/>
                <AddEmployee/>
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard
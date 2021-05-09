import { mount } from '@vue/test-utils'
import AdminUsers from '@/components/AdminUsers'

const userList = [
  {
    "permissions": [
      "create-edit structures",
      "read structures",
      "delete structures",
      "create-edit workplaces",
      "read workplaces",
      "delete workplaces",
      "create-edit employees",
      "read employees",
      "delete employees",
      "admin"
    ],
    "_id": "60917b3df5729029f4b7360b",
    "name": "Admin",
    "surname": "Admin",
    "email": "arnaas.r@gmail.com",
    "confirmed_email": "arnaas.r@gmail.com",
    "password": "$2a$10$WeVBJbKABIBjs4oqQ0sz2.JNk.fKLvARHwaR146Q2Z8On7RKid6Sy",
    "date": "2021-05-04T16:50:05.209Z",
    "__v": 0
  }
]

const wrapper = mount(AdminUsers, {
  data() {
    return{
      Users: userList
    }
  }
})

describe('AdminUsers component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display User information in table', () => {
    expect(wrapper.vm.Users[0].name).toBe("Admin")
  })


  it('Add user button exist', () => {
    const input = wrapper.find("#addUser")
    expect(input.exists()).toBe(true)
  })

  it('Open Add modal when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find("#addUser").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit user button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })

  it('Open Edit modal when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete user button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete user when delete button is triggered', async () => {
    wrapper.setMethods({ deleteGroup:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteGroup).toHaveBeenCalledTimes(1)
  })
  
})

import { mount } from '@vue/test-utils'
import Workplaces from '@/components/WorkPlaces'

const workplaceList = [
    {
        "_id": "6091703254600e44302dd6f7",
        "street": "Sukileliu pr.",
        "number": "11",
        "city": "Kaunas",
        "country": "Lietuva",
        "date": "2021-05-04T16:02:58.497Z",
        "__v": 0
    }
]

const wrapper = mount(Workplaces, {
  data() {
    return{
        workPlaces: workplaceList
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

  it('Display Workplace information in table', () => {
    expect(wrapper.vm.workPlaces[0].street).toBe("Sukileliu pr.")
  })


  it('Add workplace button exist', () => {
    const input = wrapper.find(".button-add")
    expect(input.exists()).toBe(true)
  })

  it('Open workplace add modal form when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".button-add").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit workplace button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })

  it('Open workplace edit modal form when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete workplace button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete workplace when delete button is triggered', async () => {
    wrapper.setMethods({ deleteGroup:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteGroup).toHaveBeenCalledTimes(1)
  })
  
})

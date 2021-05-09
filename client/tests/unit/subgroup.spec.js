import { mount } from '@vue/test-utils'
import SubGroup from '@/components/structureComponents/SubGroup'

const dataList = [
    {
        "_id":"60917541e1a4cf0960e6167e",
        "name":"Junior",
        "group_id":{
           "_id":"60917506e1a4cf0960e61678",
           "name":"Front-End",
           "region_id":"609174f4e1a4cf0960e61674",
           "createdAt":"2021-05-04T16:23:34.530Z",
           "updatedAt":"2021-05-04T16:23:34.530Z",
           "__v":0
        },
        "createdAt":"2021-05-04T16:24:33.813Z",
        "updatedAt":"2021-05-04T16:24:33.813Z",
        "__v":0
     }
]

const wrapper = mount(SubGroup, {
  data() {
    return{
        subGroups: dataList
    }
  }
})

describe('SubGroup list component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display SubGroup information in table', () => {
    expect(wrapper.vm.subGroups[0].name).toBe("Junior")
  })

  it('Display SubGroup nested Region information in table', () => {
    expect(wrapper.vm.subGroups[0].group_id.name).toBe("Front-End")
  })

  it('Add subgroup button exist', () => {
    const input = wrapper.find(".button-add")
    expect(input.exists()).toBe(true)
  })

  it('Open subgroup add modal form when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".button-add").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit subgroup button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })
  
  it('Open subgroup edit modal form when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete subgroup button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete subgroup when delete button is triggered', async () => {
    wrapper.setMethods({ deleteGroup:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteGroup).toHaveBeenCalledTimes(1)
  })
  
})

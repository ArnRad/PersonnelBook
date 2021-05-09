import { mount } from '@vue/test-utils'
import Group from '@/components/structureComponents/Group'

const dataList = [
    {
        "_id":"60917506e1a4cf0960e61678",
        "name":"Front-End",
        "region_id":{
           "_id":"609174f4e1a4cf0960e61674",
           "name":"Lietuvos",
           "subdivision_id":"6091710154600e44302dd6ff",
           "createdAt":"2021-05-04T16:23:16.399Z",
           "updatedAt":"2021-05-04T16:23:16.399Z",
           "__v":0
        },
        "createdAt":"2021-05-04T16:23:34.530Z",
        "updatedAt":"2021-05-04T16:23:34.530Z",
        "__v":0
     }
]

const wrapper = mount(Group, {
  data() {
    return{
        Groups: dataList
    }
  }
})

describe('Group list component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Group information in table', () => {
    expect(wrapper.vm.Groups[0].name).toBe("Front-End")
  })

  it('Display Group nested Region information in table', () => {
    expect(wrapper.vm.Groups[0].region_id.name).toBe("Lietuvos")
  })

  it('Add group button exist', () => {
    const input = wrapper.find(".button-add")
    expect(input.exists()).toBe(true)
  })

  it('Open group add modal form when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".button-add").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit group button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })

  it('Open group edit modal form when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete group button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete group when delete button is triggered', async () => {
    wrapper.setMethods({ deleteGroup:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteGroup).toHaveBeenCalledTimes(1)
  })
  
})

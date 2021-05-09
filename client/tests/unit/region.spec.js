import { mount } from '@vue/test-utils'
import Region from '@/components/structureComponents/Region'

const dataList = [
    {
        "_id":"609174f4e1a4cf0960e61673",
        "name":"Lietuvos",
        "subdivision_id":{
           "_id":"6091710b54600e44302dd700",
           "name":"Linux programuotojas",
           "division_id":"609170e054600e44302dd6fa",
           "workplace_id":"6091704454600e44302dd6f8",
           "createdAt":"2021-05-04T16:06:35.313Z",
           "updatedAt":"2021-05-04T16:06:35.313Z",
           "__v":0
        },
        "createdAt":"2021-05-04T16:23:16.358Z",
        "updatedAt":"2021-05-04T16:23:16.358Z",
        "__v":0
     }
]

const wrapper = mount(Region, {
  data() {
    return{
        Regions: dataList
    }
  }
})

describe('Region list component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Region information in table', () => {
    expect(wrapper.vm.Regions[0].name).toBe("Lietuvos")
  })

  it('Display Region nested Subdivision information in table', () => {
    expect(wrapper.vm.Regions[0].subdivision_id.name).toBe("Linux programuotojas")
  })

  it('Add region button exist', () => {
    const input = wrapper.find(".button-add")
    expect(input.exists()).toBe(true)
  })

  it('Open region add modal form when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".button-add").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit region button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })

  it('Open region edit modal form when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete region button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete region when delete button is triggered', async () => {
    wrapper.setMethods({ deleteRegion:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteRegion).toHaveBeenCalledTimes(1)
  })
  
})

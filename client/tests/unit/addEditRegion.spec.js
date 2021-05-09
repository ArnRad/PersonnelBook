import { mount } from '@vue/test-utils'
import AddEditRegion from '@/components/actions/AddEditRegion'

const dataList = [
    {
        "_id":"609174f4e1a4cf0960e61673",
        "name":"Lietuvos",
        "subdivision_id":"6091710b54600e44302dd700",
        "createdAt":"2021-05-04T16:23:16.358Z",
        "updatedAt":"2021-05-04T16:23:16.358Z",
        "__v":0
     }
  ]

const wrapper = mount(AddEditRegion, {
  data() {
    return{
        region: dataList
    }
  }
})

describe('Add/Edit Region modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with region data loaded', () => {
    expect(wrapper.vm.region[0].name).toBe("Lietuvos")
  })

  it('Display Add modal form without region data loaded', () => {
    const wrapper = mount(AddEditRegion, {
        data() {
          return{
            region: {}
          }
        }
    })
    expect(wrapper.vm.region).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})

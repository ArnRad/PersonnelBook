import { mount } from '@vue/test-utils'
import Division from '@/components/structureComponents/Division'

const dataList = [
    {
        "_id":"609170e054600e44302dd6f9",
        "name":"Programavimo",
        "workplace_id":{
           "_id":"6091703254600e44302dd6f7",
           "street":"Sukileliu pr.",
           "number":"11",
           "city":"Kaunas",
           "country":"Lietuva",
           "date":"2021-05-04T16:02:58.497Z",
           "__v":0
        },
        "createdAt":"2021-05-04T16:05:52.783Z",
        "updatedAt":"2021-05-04T16:05:52.783Z",
        "__v":0
     }
]

const wrapper = mount(Division, {
  data() {
    return{
        Divisions: dataList
    }
  }
})

describe('Divisions list component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Division information in table', () => {
    expect(wrapper.vm.Divisions[0].name).toBe("Programavimo")
  })

  it('Display Division nested Workplace information in table', () => {
    expect(wrapper.vm.Divisions[0].workplace_id.street).toBe("Sukileliu pr.")
  })


  it('Add division button exist', () => {
    const input = wrapper.find(".button-add")
    expect(input.exists()).toBe(true)
  })

  it('Open division add modal form when add button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".button-add").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Edit division button exist', () => {
    const input = wrapper.find(".edit-btn")
    expect(input.exists()).toBe(true)
  })

  it('Open division edit modal form when edit button is triggered', async () => {
    wrapper.setMethods({ toggleViewForm:jest.fn() })
    await wrapper.find(".edit-btn").trigger('click')
    expect(wrapper.vm.toggleViewForm).toHaveBeenCalledTimes(1)
  })

  it('Delete division button exist', () => {
    const input = wrapper.find(".delete-btn")
    expect(input.exists()).toBe(true)
  })

  it('Delete division when delete button is triggered', async () => {
    wrapper.setMethods({ deleteDivision:jest.fn() })
    await wrapper.find(".delete-btn").trigger('click')
    expect(wrapper.vm.deleteDivision).toHaveBeenCalledTimes(1)
  })
  
})

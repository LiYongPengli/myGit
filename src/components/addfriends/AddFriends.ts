import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class AddFriendsCom extends Vue{
    @Prop({}) visable!:number;
}
import {FC} from 'react';
import {DndContext, DragEndEvent, MouseSensor, useSensor, useSensors} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

type PropsType = {
    children: JSX.Element | JSX.Element[],
    items: {id:string;[key:string]:any}[],
    onDragEnd: (oldIndex:number,newIndex:number) => void
}
const SortableContainer:FC<PropsType> = ({
    items,
    children,
    onDragEnd
})=> {
  const sensors = useSensors(
    useSensor(MouseSensor,{
        activationConstraint: {
            distance: 8, // 活动限制 鼠标点击拖动大于8px才触发
        }
    })
  )
  function handleDragEnd(e:DragEndEvent){
    const {active,over} = e
    if(!over) return
    if(active.id !== over.id) {
        const oldIndex = items.findIndex(c=>c.id === active.id)
        const newIndex = items.findIndex(c=>c.id === over.id)
        onDragEnd(oldIndex,newIndex)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export default SortableContainer
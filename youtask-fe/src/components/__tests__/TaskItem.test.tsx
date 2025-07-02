import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskItem from '../TaskItem';
import type { Task } from '../../models/Task.model';

// Mock the drag and drop context for testing
const MockDragDropContext = ({ children }: { children: React.ReactNode }) => (
  <DragDropContext onDragEnd={() => {}}>
    <Droppable droppableId="test">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'IN_PROGRESS',
    createdDate: '2024-01-01T00:00:00Z',
    lastModifiedDate: '2024-01-02T00:00:00Z',
  };

  const mockProps = {
    task: mockTask,
    index: 0,
    onDeleteRequest: jest.fn(),
    onEdit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task title and description', () => {
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} />
      </MockDragDropContext>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} />
      </MockDragDropContext>
    );

    const editButton = screen.getByLabelText('Edit task');
    fireEvent.click(editButton);

    expect(mockProps.onEdit).toHaveBeenCalledWith(mockTask);
  });

  test('calls onDeleteRequest when delete button is clicked', () => {
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} />
      </MockDragDropContext>
    );

    const deleteButton = screen.getByLabelText('Delete task');
    fireEvent.click(deleteButton);

    expect(mockProps.onDeleteRequest).toHaveBeenCalledWith(mockTask);
  });

  test('applies completed styles when task status is COMPLETED', () => {
    const completedTask = { ...mockTask, status: 'COMPLETED' as const };
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} task={completedTask} />
      </MockDragDropContext>
    );

    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('line-through');
  });

  test('formats and displays dates correctly', () => {
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} />
      </MockDragDropContext>
    );

    expect(screen.getByText('1/1/2024')).toBeInTheDocument(); // createdDate
    expect(screen.getByText(/Updated: 1\/2\/2024/)).toBeInTheDocument(); // lastModifiedDate
  });

  test('renders without description when not provided', () => {
    const taskWithoutDescription = { ...mockTask, description: '' };
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} task={taskWithoutDescription} />
      </MockDragDropContext>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  test('handles invalid date strings gracefully', () => {
    const taskWithInvalidDate = { 
      ...mockTask, 
      createdDate: 'invalid-date',
      lastModifiedDate: 'another-invalid-date'
    };
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} task={taskWithInvalidDate} />
      </MockDragDropContext>
    );

    expect(screen.getByText('Invalid Date')).toBeInTheDocument();
    expect(screen.getByText(/Updated: Invalid Date/)).toBeInTheDocument();
  });

  test('renders with drag handle', () => {
    render(
      <MockDragDropContext>
        <TaskItem {...mockProps} />
      </MockDragDropContext>
    );

    const dragHandle = screen.getByLabelText('Drag to reorder task');
    expect(dragHandle).toBeInTheDocument();
  });
}); 
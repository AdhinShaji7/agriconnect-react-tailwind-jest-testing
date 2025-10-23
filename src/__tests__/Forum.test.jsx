import { render, screen, fireEvent } from "@testing-library/react";
import { ForumContext } from "../context/ForumContext";
import Forum from "../pages/Forum";

describe("Forum Component", () => {
  const mockAddPost = jest.fn();
  const mockPosts = [{ id: 1, title: "Agri Tips", body: "Use organic fertilizers!" }];

  test("renders forum title", () => {
    render(
      <ForumContext.Provider value={{ posts: mockPosts, loading: false, addPost: mockAddPost }}>
        <Forum />
      </ForumContext.Provider>
    );

    expect(screen.getByText(/AgriConnect Forum/i)).toBeInTheDocument();
  });

  test("displays posts correctly", () => {
    render(
      <ForumContext.Provider value={{ posts: mockPosts, loading: false, addPost: mockAddPost }}>
        <Forum />
      </ForumContext.Provider>
    );

    expect(screen.getByText(/Agri Tips/i)).toBeInTheDocument();
    expect(screen.getByText(/Use organic fertilizers/i)).toBeInTheDocument();
  });

  test("adds a new post when form is submitted", () => {
    render(
      <ForumContext.Provider value={{ posts: [], loading: false, addPost: mockAddPost }}>
        <Forum />
      </ForumContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Post Title/i), {
      target: { value: "New Crop Ideas" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Discuss drip irrigation" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Post/i }));

    expect(mockAddPost).toHaveBeenCalledTimes(1);
  });
});

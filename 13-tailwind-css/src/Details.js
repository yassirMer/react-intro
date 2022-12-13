import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div class="container mx-auto bg-slate-50 p-10 rounded-lg shadow-md">
        <div class="text-center">
          <Carousel images={images} />
          <h1 class="text-5xl text-left">{name}</h1>
          <h2 class="text-md mb-10 text-left">{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                class="text-white font-bold py-2 px-4 rounded mb-10"
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p class="text-left">{description}</p>
          {showModal ? (
            <Modal>
              <div class="fixed top-0 left-0 right-0 z-3 h-screen p-4 overflow-y-auto bg-white bg-gray-800/50 "></div>
              <div class="fixed top-1/2 left-1/2 z-4 transform -translate-x-1/2 -translate-y-1/2 w-5/12 bg-white rounded-sm p-5">
                <h1 class="text-4xl font-bold dark:text-white">
                  Would you like to adopt {name}?
                </h1>
                <div class="flex align-center mt-10 justify-end">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <>
                        <a
                          href="https://bit.ly/pet-adopt"
                          class="text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
                          style={{ backgroundColor: theme }}
                        >
                          Yes
                        </a>
                        <button
                          onClick={this.toggleModal}
                          class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800"
                          style={{ backgroundColor: theme }}
                        >
                          No
                        </button>
                      </>
                    )}
                  </ThemeContext.Consumer>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};
export default WrappedDetails;

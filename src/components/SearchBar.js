import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    InputGroup,
    Container,
    InputGroupButtonDropdown,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Alert
} from 'reactstrap';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.state = {
            dropdownOpen: false,
            splitButtonOpen: false,
            query: '',
            alertOn: false,
            error: ''
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    toggleDropDown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleSplit() {
        this.setState({
            splitButtonOpen: !this.state.splitButtonOpen
        });
    }


    handleSearch = (e) => {
        e.preventDefault();
        if (this.state.query === '') {
            this.setState({
                alertOn: true,
                error: 'Please enter a valid search'
            })
        } else {
            this.props.history.push(`/SearchResults/${this.state.query}/${e.target.value}`);
        this.setState({
            query: '',
            alertOn: false,
        })
        }

    }

    setQuery = (e) => {
        this.setState({
            query: e.target.value
        })
        console.log(e.target.value)
    }


    onDismiss() {
        this.setState({ alertOn: false });
    }


    render() {
        const { query, error, alertOn } = this.state
        return (
            <>
                <Container style={{ width: '800px' }}>
                    <InputGroup >
                        <Input value={query} placeholder="Search" onChange={this.setQuery} />
                        <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                            <DropdownToggle caret color='white'>
                                Search by
            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Search by</DropdownItem>
                                <DropdownItem onClick={this.handleSearch} value='name'>Name</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleSearch} value='color'>Color</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleSearch} value='description'>Description</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.handleSearch} value='event type'>Event</DropdownItem>
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                    <Container style={{width: '70%'}}>
                    <Alert color="info" isOpen={alertOn} toggle={this.onDismiss}>
                        {error}
                    </Alert>
                </Container>
                </Container>
            </>
        );
    }
}


export default withRouter(SearchBar);
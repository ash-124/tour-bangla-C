

const FilterInput = ({role, setRole }) => {
    
    const filterTerms = ['Tourist', 'Tour-Guide', 'Admin'];
    return (
        <div>
            <form className="filter flex items-center gap-2">
                {/* Reset button */}
                <input className="btn btn-sm btn-square"
                    type="reset"
                    value="×"
                    onClick={() => setRole('')} />
                {/* Filter items */}
                {filterTerms.map((term, i) => <input key={i}
                    className="btn btn-xs"
                    type="radio"
                    name="role"
                    aria-label={term}
                    onChange={(e)=>setRole( e.target.getAttribute('aria-label').toLowerCase())} />)}
            </form>
        </div>
    );
};

export default FilterInput;
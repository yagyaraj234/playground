#include <iostream>
using namespace std;

// Problem: How to find duplicate number on Integer array in cpp?

int main() {

    int arr[50]={0};
    int occ[50]={0};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout<<"size: "<<n<<endl<<endl;
    for(int it=0;it<n;it++){
        int random_num=(rand() % n) + 1;
        arr[it]=random_num;
    }

    sort(arr,arr+n);
    cout<<"Printing number "<<endl<<endl;

    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
    cout<<endl<<endl;

    //  store the occurunce  of repeating numbers
    //
    for(int i=0;i<n;i++){
        occ[arr[i]-1]++;
    }


    cout<<"printing occ"<<endl<<endl;

    for(int i=0;i<n;i++){
        cout<<occ[i]<<" ";
    }
    cout<<endl<<endl;
    cout<<"Printing duplicate numbers "<<endl;

    for(int i=0;i<n;i++){
        if(occ[i]> 1){
            cout<<i+1<<" ";
        }
    }





    return 0;
}
